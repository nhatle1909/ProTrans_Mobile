import { useState, useEffect } from 'react';
import { GetNotaTask } from '@/Utils/ANAPI/AssignmentNotarizationAPI';
import {DecodeToken, GetToken } from '@/Utils/TokenUtil';
import { GetOrder } from '@/Utils/OrderAPI/OrderAPI';
export interface AssignmentNotarizationModel {
    id: string;
    shipperId: string;
    orderId: string;
    code: string;
    numberOfNotarization: number;
    status: string;
    deadline:  string ; // Adjust the type based on your API's response
  }
const DataToken = DecodeToken();
const Token = GetToken();
export const useAssignmentNotarizations = () => {
  const [assignmentNotarizations, setAssignmentNotarizations] = useState<AssignmentNotarizationModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetNotaTask(Token, DataToken.Id); // Assuming you have token and id
        setAssignmentNotarizations(data); // Update state with initial data

        // Iterate through each assignment notarization and fetch order details
        const updatedData = await Promise.all(
          data.map(async (assignment) => {
            const order = await GetOrder(Token, assignment.orderId);
            const dateObject =  new Date(order.deadline);
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return { ...assignment, deadline: formattedDeadline }; // Merge data
          })
        );

        setAssignmentNotarizations(updatedData); // Update state with updated deadlines
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return assignmentNotarizations;
};