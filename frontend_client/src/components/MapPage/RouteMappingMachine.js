import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";


const createRoutineMachineLayer = ({ position, color, waypoints }) => {

  const generateIcons = (i) => {
    if (incompleteWaypoints[i].address.isWarehouse) {
        
      return new L.Icon({
        iconUrl: "https://icons.veryicon.com/png/o/miscellaneous/indata/warehouse-alt.png",
        // iconUrl: "https://www.shutterstock.com/image-vector/cargo-truck-facing-left-vector-260nw-1198116868.jpg",
        iconSize: [32, 32],
      });
      
      console.log(incompleteWaypoints[i]);
    }
    
    console.log(incompleteWaypoints[i]);

    return new L.Icon({
      iconUrl: "https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-House-Chimney-User-icon.png",
      iconSize: [32, 32],
    });
  };

  const incompleteWaypoints = waypoints.filter((waypoint)=>{
    return !waypoint.completed;
  });

  // const lastCompleteWaypoint = incompleteWaypoints[0].address.isWarehouse? null: waypoints.filter((waypoint)=>{
  //   return waypoint.completed;
  // }).findLast();

  const lastCompleteWaypoint = waypoints.findLast((waypoint)=>waypoint.completed)
  
  if (lastCompleteWaypoint){
    incompleteWaypoints.unshift(lastCompleteWaypoint)
  }

  console.log(incompleteWaypoints);

  const allAddresses = incompleteWaypoints.map(waypoint => waypoint.address.name);

  // useEffect(() => {
  //   // Update the waypoints when the incompleteWaypoints change
  //   instance.setWaypoints(incompleteWaypoints.map((waypoint) => L.latLng(waypoint.address.latitude, waypoint.address.longitude)));
  // }, [incompleteWaypoints]);
  // var map = L.map('map');

  const instance = L.Routing.control({
    position,
    // waypoints: allWaypoints.map((geo) => L.latLng(geo[0], geo[1])),
    waypoints: incompleteWaypoints.map((waypoint) => L.latLng(waypoint.address.latitude, waypoint.address.longitude)),
    collapsible: true,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color }],

    },

    createMarker: (i, coordinates, n) => {

      const address = allAddresses[i];

      const marker = generateIcons(i);

      return L.marker(coordinates.latLng, {

        draggable: false,

        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
        },
        icon: marker,

      })

        .bindPopup(address)
        .openPopup();
    },

  })//.addTo(map);

  L.Routing.errorControl(instance)//.addTo(map);

  // setInterval(function () {
  //   // instance.setWaypoints(
  //   //   incompleteWaypoints.map((waypoint) => L.latLng(waypoint.address.latitude, waypoint.address.longitude))
  //   // )
  //   var newWaypoint = instance.getWaypoints()[0].latLng;
	// var newLat = newWaypoint.lat + 0.01;
	// var newLng = newWaypoint.lng + 0.01;
  // instance.setWaypoints([
  //      L.latLng(newLat, newLng),
  //      instance.options.waypoints[1]
  //    ]);
  // }, 10000);

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);


export default RoutingMachine;