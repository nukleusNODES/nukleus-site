export class Regex {

   public static PHONE_REGEX = `^[1-9]{1}[0-9]{9}$`;
   public static EMAIL_REGEX = `^[a-zA-Z0-9!#$%&'*+=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$`;
   public static NAME_REGEX = `^[a-zA-Z ]*$`;
   public static SELECT_REGEX = `^((?!Select).)*$`;
   public static NUMBER_REGEX = `^[0-9]*$`;
}