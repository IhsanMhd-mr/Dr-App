class Patient {
    constructor(fname,lname,nic, gender, dob,age, phone_no,occupation,desc,pro_pic,  heartRate,bloodGroup,height,weight) {
        this.fname = fname;
        this.lname = lname;
        this.nic = nic;
        this.gender = gender;
        this.dob = dob;
        this.age = age;
        this.phone_no = phone_no;
        this.desc = occupation;
        this.desc = desc;
        this.pro_pic = pro_pic;
// addition
        this.heartRate = heartRate;
        this.bloodGroup = bloodGroup;
        this.height = height;
        this.weight = weight ;

    }
   
}

Patient.exports = Patient; 