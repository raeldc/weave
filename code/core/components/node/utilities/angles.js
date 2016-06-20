var radToDeg = ( rad ) => {
    return ( rad * ( 180 / Math.PI ) )
}

var degToRad = ( deg ) => {
    //
    return ( deg * ( Math.PI / 180 ) )
}

export function getPos( angle, dist ) {
    var x, y
    x = dist * Math.cos( degToRad( angle ) )
    y = dist * Math.sin( degToRad( angle ) )

    return {
        x,
        y
    }
}

export default {
    getPos
}
