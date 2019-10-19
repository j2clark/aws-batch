package com.j2clark.aws;

public class Batch {

    public static void main(String[] args) {

        System.out.println("do something!");
        if (args != null) {
            int i = 0;
            for (String arg : args) {
                System.out.println(String.format("Arg[%d] => %s", i++, arg));
            }
        }

    }

}
