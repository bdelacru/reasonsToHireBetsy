package com.betsy.reasonstohire.repository;

import com.betsy.reasonstohire.model.Reason;
import com.betsy.reasonstohire.model.ReasonType;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReasonRepository extends JpaRepository<Reason, UUID> {
    List<Reason> findByApprovedTrue();
    List<Reason> findByApprovedFalse();

    List<Reason> findByTypeAndApprovedTrue(ReasonType type);
//List<Reason> findBySubmittedByOthersTrueAndApprovedTrue();
}
