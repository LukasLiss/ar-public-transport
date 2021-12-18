class Location{
    constructor(lat, lng, objPath, posX, posY, posZ, scaleX, scaleY, scaleZ, imgPath, headline, text){
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
        this.imagePath = imgPath;
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

    getIndexOfLocation(location){
        this.locations.indexOf(location);
    }

    getLocationsWithEstimations(currentLocation){

        
        let ind = this.locations.indexOf(currentLocation);
        let result = [];
        
        //console.log("Exists" + ind);
        //console.log(this.locations.length);

        let length = this.locations.length;

        for(let i=0; i < length; i++){
            let loc = this.locations[i];
            if(i < ind) loc.timeId = 0;
            if(i == ind) loc.timeId = 1;
            if(i > ind) loc.timeId = 2;
            loc.minute = Math.max(0, i - ind);
            result.push(loc);

            //console.log(result);
            //console.log("i = " + i + " < " + this.locations.length);
        }

        return result;
    }
}

let exampleBusLine = new BuslineLocations();
exampleBusLine.addLocation(new Location(1, 1, "/data/kickelhahn_tower/scene.gltf", 0, -3, 0, 0.3, 0.3, 0.3, "example.jpeg", "Kickelhahn Tower", "- 1830s Ilmenau (town in Germany) developed a health resort and wanted to build an observation tower, but they did not have enough budget for it <br> - That plan was realized in 1852 <br> - The grand duke and duchess of Saxe-Weimar visited Ilmenau and wanted a similar tower to be built in Kickelhahn <br> - Grand Duchess donated 1000 Thaler for the construction <br> - The observation tower in Kickelhahn was opened in 1855 <br> - It is the oldest remaining observation tower in the Thuringian Forest <br> - Observation platform at 21m height <br> Source: <br> https://en.wikipedia.org/wiki/Kickelhahn"));
exampleBusLine.addLocation(new Location(2, 2, "/data/monument_to_soviet_soldier/scene.gltf", 0, -3, 0, 4, 4, 4, "example.jpeg", "Monument to soviet soldier", "- The statue does not depict any real person. Instead it represents the ideal of a soviet soldier <br> - There has been some debate about this statue in independent country X. The main arguments are: <br> - They no longer want to be associated with the Soviet Union <br> - Removing the statue would effectively erase history"));
exampleBusLine.addLocation(new Location(3, 3, "/data/monumento__monument/scene.gltf", 0, -1.5, 0, 0.04, 0.04, 0.04, "example.jpeg", "Memorial stone", "- Memorial stone for those who fell in a nonexistent war <br> - The monument is quite bare because of financial difficulties after the war ended <br> - The government wanted to mask the financial difficulties by explaining that the monuments are not decorated, because war is not beautiful <br> - Sturdiness was valued more than aesthetics when building it so that the people it was built for would not be forgotten <br> - Names of people with the same birthplace are placed on the same monument <br> - This is only one of the many similar monuments that exist"));
exampleBusLine.addLocation(new Location(4, 4, "/data/old_church_in_poland/scene.gltf", 0, -3, 2, 0.005, 0.005, 0.005, "example.jpeg", "Old Polish Church", "- Situated in a small town in Poland called Krużlowa Wyżna <br> - The town has a population of about 1440 <br> - The church is surrounded by a stone wall <br> - The church itself does not seem to be very famous. However a beautiful statue of Virgin Mary was found inside it <br> - The statue was bought by the National Museum of Krakow in 1924 <br> - In 1940 the sculpture was taken by the german forces <br> - Since 2007 it has been in the Krakow National Museum again. <br> Sources: <br> https://en.wikipedia.org/wiki/Kru%C5%BClowa_Wy%C5%BCna <br> https://en.wikipedia.org/wiki/Beautiful_Virgin_Mary_from_Kru%C5%BClowa"));
exampleBusLine.addLocation(new Location(5, 5, "/data/statue_from_the_nereid_monument_no/scene.gltf", 0, -3, 0, 1, 1, 1, "example.jpeg", "Nereid statue", "- Identified as Nereid, because sculptures of sea creatures were found under it <br> - This is one of eleven remaining Nereid statues in a monument in Xanthos <br> About Nereids: <br> - Sea nymphs in greek mythology <br> - Accompany Poseidon and carry his trident <br> - Associated with the Aegean Sea <br> - Daughters of Nereus <br> - Live in a golden palace in the ocean <br> - Friendly and helpful to sailors <br> - Symbolize everything that is beautiful and kind about the sea <br> Sources: <br> https://en.wikipedia.org/wiki/Nereids <br> https://en.wikipedia.org/wiki/Nereid_Monument"));
exampleBusLine.addLocation(new Location(6, 6, "/data/stone_monument/scene.gltf", 0, -2, 0, 1, 1, 1, "example.jpeg", "Monument of Aisling", "- Aisling is a goddess of a nonexistent religion <br> - Aisling is a gaelic name which means fantasy, vision or dream <br> - An unclosed triangle is the symbol of Aisling <br> - The symbol almost forms an arrow, because in this religion dreams are believed to show which way to go in life <br> - Those devoted to Aisling tattoo Aisling’s symbol on the back of their palm so that it reminds them of their faith <br> - It is believed that the monument gives visions to those who are worthy"));

export {Location, BuslineLocations, exampleBusLine}