export default class FloatProfile
{
    constructor(name, profile, upRate, alt, downRate, descentTime, descentDuration, weight) {
        this.name = name;
        this.profile = profile;
        this.ascent_rate = upRate;
        this.float_altitude = alt;
        this.descent_before_sunset = descentTime; // sec
        this.descent_duration = descentDuration; // sec
        this.descent_rate = downRate;
        this.weight = weight; // kg
    }
}