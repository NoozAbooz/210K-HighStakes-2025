#include "main.h"

void skills() { /* NO COLOUR SORT */

       // chassis.moveToPoint(0, 0, 5000);
       // intake.move_voltage(-12000);
       // wallStake.move_voltage(12000);
       // pros::delay(470);
       // wallStake.brake();
       // chassis.moveToPoint(0.562, -11.014, 700, {.forwards = false, .maxSpeed = 40}); //mogo
       // pros::Task([] {
       //        liftControl(wallstakeStates[0]);
       //        pros::delay(70);
       //        clampPiston.set_value(true);
       //        pros::delay(500);
       //         intake.move_voltage(12000);
       //  });
       //  pros::delay(1000);
       // chassis.moveToPoint(-17.832, -37.976, 1000); //r1
       // pros::delay(500);
       // chassis.moveToPoint(-23, -61, 700);
       // chassis.moveToPoint(-37, -86.97, 1000); //wall ring
       // pros::Task([] {
       //        pros::delay(200);
       //        liftControl(wallstakeStates[1]);
       //        pros::delay(1500);
       //        intake.move_voltage(0);
       // });
       // pros::delay(1000);
       // chassis.moveToPoint(-23, -64, 1500);
       // chassis.turnToHeading(135, 600);
       // chassis.moveToPoint(-9, -78, 1000);
       // pros::Task([] {
       //        pros::delay(800);
       //        liftControl(wallstakeStates[2]);
       //        pros::delay(400);
       //        intake.move_voltage(12000);
       // });
       // pros::delay(2000);
       // chassis.moveToPoint(-23, -58, 1500, {.forwards = false});
       // chassis.moveToPoint(-3.289, -55.527, 1000); //r3
       // chassis.moveToPoint(20.687, -33.082, 5000); //r4&5
       // chassis.moveToPoint(27.521, -29.17, 5000); //r6
       // chassis.moveToPoint(25.07, -46.769, 5000); //corner
       // //first corner
       // chassis.moveToPoint(43.681, -38.52, 5000);
       // chassis.moveToPoint(-26.218, 9.361, 5000);
       // chassis.moveToPoint(-48.714, -4.261, 5000);
       // chassis.moveToPoint(-95.317, -19.771, 5000);
       // chassis.moveToPoint(-88.437, 5.995, 5000);
       // chassis.moveToPoint(-91.982, 10.674, 5000);
       // chassis.moveToPoint(-64.569, 13.163, 5000);
       // chassis.moveToPoint(-39.083, 37.451, 5000);
       // chassis.moveToPoint(-55.23, 38.062, 5000);
       // chassis.moveToPoint(-45.649, 58.011, 5000);
       // chassis.moveToPoint(-48.122, -36.423, 5000);
       // chassis.moveToPoint(-94.762, -82.436, 5000);
       // chassis.moveToPoint(-78.081, -90.311, 5000);
       // chassis.moveToPoint(-60.301, -110.737, 5000);
       // chassis.moveToPoint(-50.429, -102.5, 5000);
       // chassis.moveToPoint(-43.176, -112.025, 5000);
       // chassis.moveToPoint(-52.214, -129.18, 5000);
       // chassis.moveToPoint(-51.028, -70.668, 5000);
       // chassis.moveToPoint(-78.361, -68.542, 5000);
       // chassis.moveToPoint(-115.066, -36.574, 5000);
       // chassis.moveToPoint(-122.487, -27.211, 5000);
       // chassis.moveToPoint(-125.227, -42.497, 5000);
       // chassis.moveToPoint(-141.416, -34.795, 5000);
       // chassis.moveToPoint(-110.669, -58.58, 5000);
       // chassis.moveToPoint(-82.262, -36.982, 5000);
       // chassis.moveToPoint(-65.628, -38.096, 5000);

       



       //old stuff
intake.move_voltage(12000);
pros::delay(400);
intake.move_voltage(0);
chassis.moveToPoint(0, 11, 1000);
pros::delay(100);
chassis.turnToHeading(90, 500);
chassis.moveToPoint(-21 , 14, 1100, {.forwards = false, .maxSpeed = 60});
pros::delay(800);
clampPiston.set_value(true);
chassis.turnToHeading(0, 600);
intake.move_voltage(12000);
chassis.moveToPoint(-20, 32, 500);
chassis.moveToPoint(-38, 47, 800);
chassis.moveToPoint(-47, 84, 1700);
pros::Task([]{
       liftControl(wallstakeStates[1]);
pros::delay(400);
});
pros::delay(800);
chassis.turnToHeading(180, 700);
pros::delay(500);
chassis.moveToPoint(-40, 63, 2700);
pros::delay(1300);
intake.move_voltage(0);
// pros::delay(100);
// wallStake.move_voltage(10000);
// pros::delay(200);
// wallStake.brake();
chassis.turnToHeading(270, 700);
// intake.move_voltage(12000);
chassis.moveToPoint(-68, 63.7, 1000);
intake.move_voltage(-100);
chassis.turnToHeading(270, 400);
liftControl(wallstakeStates[2]);
chassis.moveToPoint(-68, 63.7, 1000);
pros::delay(300);
intake.move_voltage(12000);
chassis.moveToPoint(-48, 63, 2000, {.forwards = false});
pros::delay(200);
chassis.turnToHeading(180, 700);
chassis.moveToPoint(-48, 0, 2000, {.maxSpeed = 60});
chassis.moveToPoint(-44, 15, 1000, {.forwards = false});
chassis.turnToHeading(270, 700);
chassis.moveToPoint(-62, 15, 1000);
pros::delay(600);
chassis.moveToPoint(-64, 0, 1000, {.forwards = false});
pros::delay(700);
clampPiston.set_value(false);

pros::Task([] {
       liftControl(wallstakeStates[0]);
});


// chassis.moveToPoint(0, 10, 1500);
// intake.move_voltage(0);
// pros::delay(100);
// chassis.turnToHeading(270, 500);
// chassis.moveToPoint(30 , 9, 1100, {.forwards = false, .maxSpeed = 60});
// pros::delay(800);
// clampPiston.set_value(true);
// chassis.turnToHeading(0, 600);
// intake.move_voltage(12000);
// pros::delay(200);
// chassis.moveToPoint(24, 24, 1000);
// chassis.moveToPoint(42, 47, 900);
// chassis.moveToPoint(49, 82, 1300);
// pros::delay(900);
// liftControl(wallstakeStates[1]);
// pros::delay(400);
// chassis.turnToHeading(180, 700);
// chassis.moveToPoint(44, 58, 2800);
// pros::delay(1200);
// intake.move_voltage(0);
// pros::delay(100);
// chassis.turnToHeading(90, 700);
// // // intake.move_voltage(12000);
// chassis.moveToPoint(67, 57.7, 1000);
// // intake.move_voltage(-300);
// chassis.turnToHeading(90, 400);
// liftControl(wallstakeStates[2]);
// chassis.moveToPoint(67, 57.7, 1000);
// pros::delay(300);
// intake.move_voltage(12000);
// chassis.moveToPoint(48, 63, 2000, {.forwards = false});
// pros::delay(200);
// chassis.turnToHeading(180, 700);
// chassis.moveToPoint(48, 0, 2000, {.maxSpeed = 70});
// chassis.moveToPoint(44, 15, 1000, {.forwards = false});
// chassis.turnToHeading(90, 700);
// chassis.moveToPoint(60, 15, 1000);
// pros::delay(300);
// chassis.moveToPoint(63, 0, 1000, {.forwards = false});
// pros::delay(700);
// clampPiston.set_value(false);



}

void skillsCS() { /* WITH COLOUR SORT */

alliance = "red";

}