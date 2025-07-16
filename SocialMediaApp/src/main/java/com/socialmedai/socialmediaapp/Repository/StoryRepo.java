package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepo extends JpaRepository<Story ,Integer> {

    public List<Story> findByUserId(int userId);
}
