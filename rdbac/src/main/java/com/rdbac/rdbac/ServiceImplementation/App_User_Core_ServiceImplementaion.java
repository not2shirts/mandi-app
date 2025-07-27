package com.rdbac.rdbac.ServiceImplementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Repositry.App_User_Repositry;
import com.rdbac.rdbac.Service.App_User_Core_Services;

@Service
public class App_User_Core_ServiceImplementaion implements App_User_Core_Services {

    private App_User_Repositry app_User_Repositry;
    public App_User_Core_ServiceImplementaion( App_User_Repositry app_User_Repositry

    )  {
            this.app_User_Repositry = app_User_Repositry;
    }


    @Override
    public boolean CanCreateOrganisation(String phoneNumber) {
        // TODO Auto-generated method stub
        List<String> organisation_created_by_user = app_User_Repositry.findByPhoneNumber(phoneNumber).get().getOrganisationId();
        return organisation_created_by_user == null || organisation_created_by_user.size() < 3;
    }


    /**
 * TODO: Establish a bidirectional association between a User and an Organization.
 * This method should:
 * - Update the User document to include the Organization ID.
 * - Update the Organization document to include the User ID.
 * 
 * Implementation is pending. Ensure atomicity and data consistency when updating both entities.
 */

    @Override
    public void Add_Organisation_to_User(String phoneNumber, String organisation_id) {
        // TODO Auto-generated method stub
        // user document orgisation 
        // orginsation user add. 
        App_User app_user =  app_User_Repositry.findByPhoneNumber(phoneNumber).get();
        if(app_user.getOrganisationId() == null) {
            app_user.setOrganisationId(new ArrayList<>(List.of(organisation_id)));
        }
        else {
            List<String> organisation_created_by_user = app_user.getOrganisationId();
            organisation_created_by_user.add(organisation_id);
            app_user.setOrganisationId(organisation_created_by_user);
        }
        app_User_Repositry.save(app_user);

    }


    @Override
    public App_User Return_User_Exist(String phoneNumber) {
        // TODO Auto-generated method stub
         App_User app_user =  app_User_Repositry.findByPhoneNumber(phoneNumber).get();
         System.out.println(app_user.toString());
         return app_user;
       
    }

    public String get_app_user_id_by_phoneNumber(String phoneNumber ) {
        App_User app_User= Return_User_Exist(phoneNumber);
        return (app_User==null ? "" : app_User.getUserId());
    }

}
