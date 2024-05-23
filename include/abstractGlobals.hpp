#pragma once

// 3rd party libraries
#include "lemlib/api.hpp"
#include "gif-pros/gifclass.hpp"
#include "robodash/api.h"

extern rd::Console console;
extern rd_view_t *gifview;

/* Functions */
// Slapper
void refreshSlapper();

// Lift
void refreshLift();

// DT
void arcadeDrive();

// Intake
void refreshIntake();

// Wings
void refreshWings();