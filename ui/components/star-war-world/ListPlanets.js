import React from 'react';

const ListPlanets = ({planets}) => {
    return planets.map((planet, index) => {
        let logOfPopulation = 0;
        if(parseInt(planet.population)) {
            logOfPopulation = Math.log(planet.population); 
        }
        let planetSize = 40 + logOfPopulation;
        let planetFont = 16 + logOfPopulation;
        return (
            <div key={index} className='planet'>
                <div className='mg-r-30'>
                    <img 
                        height={planetSize}
                        width={planetSize}
                        src={`/icons/planets/planet${(index % 11) + 1}.svg`} 
                        alt={planet.name}
                    />
                </div>
                <div style={{fontSize: planetFont}}>
                    <div><b>Planet Name : </b>{planet.name}</div>
                    <div><b>Planet Population : </b> {planet.population}</div>
                    <div><b>Planet Diameter : </b>{planet.diameter}</div>
                </div>
            </div>
        )
    })
}

export default ListPlanets;