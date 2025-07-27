package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Pojos.App_User;

public interface App_User_Core_Services {

    // 
    boolean CanCreateOrganisation(String phoneNumber);
    void Add_Organisation_to_User(String phoneNumber, String organisation_id);
    App_User Return_User_Exist(String phoneNumber);
}
