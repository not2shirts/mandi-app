package com.rdbac.rdbac;

import com.rdbac.rdbac.Pojos.App_User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    @Autowired
    private TestRepo testRepo;

    @GetMapping("/")
    public String tes() {
       User u1 =new User();
       u1.setUsername("admin");
       u1.setPassword("password");

        App_User appUser = new App_User();

       testRepo.save(u1);

        return "User SAVED";
    }
}
