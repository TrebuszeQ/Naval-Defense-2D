import { Component } from "@angular/core";

export interface Levels {
    name: string,
    difficulty: number,
    description: string,
    componentName: string,
    backgroundImagePath: string,
    startingDate: Date,
    startingPosition: number,
    resources: number,
    infrastructureEndurance: number,
}
