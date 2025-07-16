package com.socialmedai.socialmediaapp.config;

public class JwtConstant {
    public static String JWT_HEADER="Authorization";
    // using this it will generate token
    private    static  String SECERET_KEY="dkfjskjfioejsdkljfkaj039risdlkfjsdkjfklasjfdfjksaflkksdjfkldsjf";



    public JwtConstant() {
    }

    public static String getJwtHeader() {
        return JWT_HEADER;
    }

    public static void setJwtHeader(String jwtHeader) {
        JWT_HEADER = jwtHeader;
    }

    public static String getSeceretKey() {
        return SECERET_KEY;
    }

    public static void setSeceretKey(String seceretKey) {
        SECERET_KEY = seceretKey;
    }
}
