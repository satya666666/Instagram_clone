package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Reels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReeslRepo  extends JpaRepository<Reels ,Integer> {

    public List<Reels>findByUserId(int userId);

}
