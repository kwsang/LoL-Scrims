package model;

import java.util.Map;
import java.util.HashMap;

public class User {
    private String id;

    public User() {

    }

    public String getID() {
        return id;
    }

    public void setID(String id) {
        this.id = id;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("teams", teams);
        return map;
    }
}