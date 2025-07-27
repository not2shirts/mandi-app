package com.rdbac.rdbac.Repositry;

import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.UserType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface App_User_Repositry  extends MongoRepository<App_User,String> {

    Optional<App_User> findByEmail(String email);
    Optional<App_User> findByPhoneNumber(String phoneNumber);
    List<App_User> findByUserType(UserType userType);
    List<App_User> findByUserTypeAndIsVerified(UserType userType, Boolean isVerified);
    Optional<App_User> findByPhoneNumberAndUserType(String phoneNumber, UserType userType);
}
