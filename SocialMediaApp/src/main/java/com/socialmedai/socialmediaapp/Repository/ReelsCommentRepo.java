package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.ReelsComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelsCommentRepo extends JpaRepository<ReelsComment, Integer> {
    @Query("SELECT rc FROM ReelsComment rc WHERE rc.reels.ReelsId = :reelsId")
    List<ReelsComment> findByReelsReelsId(@Param("reelsId") int reelsId);
}
