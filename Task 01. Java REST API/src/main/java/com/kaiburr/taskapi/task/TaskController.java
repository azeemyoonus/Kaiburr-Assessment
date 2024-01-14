package com.kaiburr.taskapi.task;

import com.kaiburr.taskapi.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin("http://localhost:3000/")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Get all tasks.
     *
     * @return List of all tasks.
     */
    @GetMapping()
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Get a task by ID.
     *
     * @param taskId The ID of the task to retrieve.
     * @return The task with the specified ID.
     * @throws ResourceNotFoundException If the task with the given ID is not found.
     */
    @GetMapping("/{taskId}")
    public Task getTaskById(@PathVariable String taskId) throws ResourceNotFoundException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found for ID: " + taskId));
        return ResponseEntity.ok().body(task).getBody();
    }

    /**
     * Add a new task.
     *
     * @param task The task to be added.
     * @return The added task.
     */
    @PostMapping("/create")
    public Task addTask(@RequestBody Task task) {
        task.setStartTime(new Date());
        task.setAzeemYoonusProperty(generateAzeemYoonusProperty());
        return taskRepository.save(task);
    }

    /**
     * Update an existing task.
     *
     * @param taskId The ID of the task to update.
     * @param task   The updated task data.
     * @return The updated task.
     */
    @PutMapping("/update/{taskId}")
    public Task updateTask(@PathVariable String taskId, @RequestBody Task task) {
        task.setId(taskId);
        task.setAzeemYoonusProperty(generateAzeemYoonusProperty());
        return taskRepository.save(task);
    }

    /**
     * Delete a task by ID.
     *
     * @param taskId The ID of the task to delete.
     */
    @DeleteMapping("/delete/{taskId}")
    public void deleteTask(@PathVariable String taskId) {
        taskRepository.deleteById(taskId);
    }

    /**
     * Find tasks by name.
     *
     * @param name The name to search for in task names.
     * @return List of tasks with names containing the specified string.
     * @throws ResourceNotFoundException If no tasks are found with the given name.
     */
    @GetMapping("/findByName")
    public ResponseEntity<List<Task>> findTasksByName(@RequestParam String name) throws ResourceNotFoundException {
        List<Task> tasks = taskRepository.findByNameContaining(name);
        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No tasks found with name: " + name);
        } else {
            return ResponseEntity.ok(tasks);
        }
    }

    /**
     * Find tasks by assignee.
     *
     * @param assignee The assignee's name.
     * @return List of up to 10 tasks assigned to the specified assignee, ordered by start time.
     * @throws ResourceNotFoundException If no tasks are found for the given assignee.
     */
    @GetMapping("/findTaskByAssignee")
    public ResponseEntity<List<Task>> findTaskByAssignee(@RequestParam String assignee) throws ResourceNotFoundException {
        List<Task> tasks = taskRepository.findTop10ByAssigneeOrderByStartTime(assignee);
        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No tasks found for assignee: " + assignee);
        } else {
            return ResponseEntity.ok(tasks);
        }
    }

    /**
     * Generate Azeem Yoonus property.
     *
     * @return A string of 5 random characters from "AzeemYoonus".
     */
    private String generateAzeemYoonusProperty() {
        String source = "AzeemYoonus";
        StringBuilder randomProperty = new StringBuilder();

        Random random = new Random();

        for (int i = 0; i < 5; i++) {
            int randomIndex = random.nextInt(source.length());
            char randomChar = source.charAt(randomIndex);
            randomProperty.append(randomChar);
        }

        return randomProperty.toString();
    }
}
