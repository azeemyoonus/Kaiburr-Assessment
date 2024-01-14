// utils/api.js
import axios from "axios";

/**
 * Search tasks by name.
 * @param {string} name - The name to search for.
 * @returns {Promise<any>} - A promise that resolves with the search results.
 */
export const searchByName = async (name:string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}task/findByName`,
      {
        params: {
          name,
        },
      }
    );

    console.log("Search by name data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching by name:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

/**
 * Search tasks by assignee.
 * @param {string} assignee - The assignee to search for.
 * @returns {Promise<any>} - A promise that resolves with the search results.
 */
export const searchByAssignee = async (assignee:string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}task/findTaskByAssignee`,
      {
        params: {
          assignee,
        },
      }
    );

    console.log("Search by assignee data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching by assignee:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};
