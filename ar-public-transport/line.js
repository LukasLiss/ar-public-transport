class Location{
    constructor(lat, lng, objPath, posX, posY, posZ, scaleX, scaleY, scaleZ, headline, text){
        this.lat = lat;
        this.lng = lng;
        this.objPath = objPath;
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
        this.headline = headline;
        this.text = text;
    }
}

class BuslineLocations{
    constructor(){
        this.locations = [];
    }

    addLocation(location){
        this.locations.push(location);
    }

    getClosestLocation(lat, lng){
        let squaredDistance = null; //squared is enough because of monotony of square root function
        let closestLocation = null;

        for(let i=0; i < this.locations.length; i++){
            let current_sq_dist = ((lat - this.locations[i].lat) * (lat - this.locations[i].lat)) + ((lng - this.locations[i].lng) * (lng - this.locations[i].lng));
            if(squaredDistance == null || current_sq_dist < squaredDistance){
                squaredDistance = current_sq_dist;
                closestLocation = this.locations[i];
            }
        }

        return closestLocation;
    }
}

let exampleBusLine = new BuslineLocations();
exampleBusLine.addLocation(new Location(1, 1, "/data/kaise/kaiser.gltf", 4, -3, 8, 6, 6, 6, "Head Location 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel felis ornare, tempor massa nec, porta velit. Duis ac metus commodo, hendrerit nisl faucibus, pretium diam. Curabitur sit amet maximus nisi. Praesent faucibus mauris eu sollicitudin iaculis. Integer id diam erat. Pellentesque dignissim lorem nisl, et sodales sem scelerisque et. Ut facilisis malesuada nisl, vel dignissim sem gravida ac. Curabitur sit amet magna bibendum, convallis quam a, tincidunt enim. Proin vitae luctus ipsum, in egestas sem. Suspendisse hendrerit nulla neque, lobortis egestas erat dignissim nec. Aliquam viverra volutpat molestie. Nullam in lacus viverra, mollis eros quis, finibus lacus. Vestibulum quis diam commodo, hendrerit turpis id, blandit libero. Praesent sit amet cursus risus. Mauris mauris nulla, consequat nec odio ut, tempus volutpat nunc.<br/><br/>Mauris sagittis mi vitae magna malesuada, id sodales orci tincidunt. Aliquam nisl mauris, condimentum non congue sed, luctus in tellus. Integer venenatis aliquet orci, sed tristique ipsum molestie vel. In sodales ut erat non euismod. Maecenas ut felis nunc. Phasellus vitae velit massa. Curabitur volutpat libero ligula, non rutrum arcu dictum non. Aliquam tempus ante sit amet placerat interdum. Curabitur semper porta nunc, a porta massa cursus vitae. Nulla sollicitudin ornare nisi, ut aliquam tellus volutpat sed. Phasellus malesuada magna dolor, id ornare nibh congue nec. Vestibulum a orci tincidunt, blandit felis ac, facilisis justo. Cras mollis lectus justo, a molestie est iaculis sed. Nullam at sodales arcu.<br/><br/>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean luctus orci a mattis dictum. Etiam fermentum condimentum eros, in malesuada elit feugiat eu. Quisque tristique odio eu sodales lacinia. Nulla vehicula risus nibh, sit amet mollis nibh convallis at. Nulla a quam dapibus, elementum urna non, facilisis enim. Ut tempor dictum sollicitudin. Duis suscipit nisi vestibulum euismod efficitur. Etiam vitae nunc non metus bibendum mattis."));
exampleBusLine.addLocation(new Location(2, 2, "/data/kaise/kaiser.gltf", 4, -3, 8, 6, 6, 6, "Head Location 2", "Lorem Ipsum 2 ..."));
exampleBusLine.addLocation(new Location(3, 3, "/data/kaise/kaiser.gltf", 4, -3, 8, 6, 6, 6, "Head Location 3", "Lorem Ipsum 3 ..."));

export {Location, BuslineLocations, exampleBusLine}