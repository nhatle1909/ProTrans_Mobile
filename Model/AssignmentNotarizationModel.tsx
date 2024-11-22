import { useState, useEffect } from 'react';
import { GetAssignmentNotarizations } from '@/Utils/ANAPI/AssignmentNotarizationAPI';
export interface AssignmentNotarizationModel {
    id: string;
    shipperId: string;
    status: string;
    fakecode:string
    deadline:  string ; // Adjust the type based on your API's response
  }

export const useAssignmentNotarizations = (Token:string,id:string) => {
  const [assignmentNotarizations, setAssignmentNotarizations] = useState<AssignmentNotarizationModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAssignmentNotarizations(Token, id); // Assuming you have token and id
       
    
        // Iterate through each assignment notarization and fetch order details
        const updatedData = await Promise.all(
          data.map(async (assignment) => {
           
            const dateObject =  new Date(assignment.deadline);
            const fakeCode = assignment.id.substring(0,8).toUpperCase();
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            console.log(formattedDeadline);
            return { ...assignment, deadline: formattedDeadline,fakecode:fakeCode }; // Merge data
          })
        );

        setAssignmentNotarizations(updatedData); // Update state with updated deadlines
      } catch (error) {
    
      }
    };

    fetchData();
  }, []);

  return assignmentNotarizations;
};