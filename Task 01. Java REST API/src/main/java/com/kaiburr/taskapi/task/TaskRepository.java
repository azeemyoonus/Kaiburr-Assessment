package com.kaiburr.taskapi.task;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Repository interface for managing Task entities in MongoDB.
 */
public interface TaskRepository extends MongoRepository<Task, String> {


    /**
     * Retrieves tasks whose name contains the specified string.
     *
     * @param name The string to search for in task names.
     * @return A list of tasks with names containing the specified string.
     */
    List<Task> findByNameContaining(String name);

    /**
     * Retrieves the top 10 tasks assigned to a specific assignee, ordered by start time.
     *
     * @param assignee The assignee's name.
     * @return A list of up to 10 tasks assigned to the specified assignee, ordered by start time.
     */
    List<Task> findTop10ByAssigneeOrderByStartTime(String assignee);
}
