// ================================
// AMR Dashboard
// ================================


async function loadRobotStatus() {

    try {

        const response =
            await fetch("/api/status");


        const data =
            await response.json();


        document.getElementById(
            "robotName"
        ).textContent =
            data.robot;


        document.getElementById(
            "robotState"
        ).textContent =
            data.state;


        document.getElementById(
            "battery"
        ).textContent =
            data.battery + "%";


        document.getElementById(
            "batteryBar"
        ).style.width =
            data.battery + "%";


        document.getElementById(
            "mode"
        ).textContent =
            data.mode;


        document.getElementById(
            "speed"
        ).textContent =
            data.speed + " m/s";


        document.getElementById(
            "rawData"
        ).textContent =
            JSON.stringify(
                data,
                null,
                2
            );

    }

    catch (error) {

        console.error(
            "Could not load robot status:",
            error
        );

    }

}


async function loadMission() {

    try {

        const response =
            await fetch("/api/mission");


        const data =
            await response.json();


        document.getElementById(
            "missionName"
        ).textContent =
            data.mission;


        document.getElementById(
            "missionStatus"
        ).textContent =
            data.status;


        document.getElementById(
            "missionProgress"
        ).textContent =
            data.progress + "%";


        document.getElementById(
            "missionTarget"
        ).textContent =
            data.target;


        document.getElementById(
            "obstacles"
        ).textContent =
            data.obstaclesDetected;


        document.getElementById(
            "missionBar"
        ).style.width =
            data.progress + "%";

    }

    catch (error) {

        console.error(
            "Could not load mission:",
            error
        );

    }

}


loadRobotStatus();

loadMission();