package com.kaiburr.taskapi.task;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Represents a task entity stored in MongoDB.
 */
@Document
public class Task {
    @Id
    private String id;
    private String name;
    private String assignee;
    private String project;
    private Date startTime;
    private String azeemYoonusProperty;

    /**
     * Gets the unique identifier of the task.
     *
     * @return The task ID.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the task.
     *
     * @param id The task ID.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the name of the task.
     *
     * @return The task name.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the task.
     *
     * @param name The task name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the assignee of the task.
     *
     * @return The task assignee.
     */
    public String getAssignee() {
        return assignee;
    }

    /**
     * Sets the assignee of the task.
     *
     * @param assignee The task assignee.
     */
    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    /**
     * Gets the project of the task.
     *
     * @return The task project.
     */
    public String getProject() {
        return project;
    }

    /**
     * Sets the project of the task.
     *
     * @param project The task project.
     */
    public void setProject(String project) {
        this.project = project;
    }

    /**
     * Gets the start time of the task.
     *
     * @return The task start time.
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * Sets the start time of the task.
     *
     * @param startTime The task start time.
     */
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    /**
     * Gets the Azeem Yoonus property of the task.
     *
     * @return The Azeem Yoonus property.
     */
    public String getAzeemYoonusProperty() {
        return azeemYoonusProperty;
    }

    /**
     * Sets the Azeem Yoonus property of the task.
     *
     * @param azeemYoonusProperty The Azeem Yoonus property.
     */
    public void setAzeemYoonusProperty(String azeemYoonusProperty) {
        this.azeemYoonusProperty = azeemYoonusProperty;
    }
}
