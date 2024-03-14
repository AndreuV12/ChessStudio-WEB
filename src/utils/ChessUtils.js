import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'

let getOpeningData = (opening, path) =>{   
    let data = opening?.data
    if (!data) return {}
    for (let i = 0; i< path.length; i++){
        data = data[path[i]]
    } 
    let { move, config, ...moves} = data
    return {config, moves, lastMove: move }
}

let checkMove = ( checked_move, config) => {
    try{
        let newConfig = move(JSON.parse(JSON.stringify(config)), checked_move.from, checked_move.to)
        return newConfig
    }
    catch{
        return false
    }
}

let addMoveToOpening = (opening, path, new_move, move_name ) => {
    //return the opening with the move added if posible, else false
    let new_op = JSON.parse(JSON.stringify(opening))
    let new_config
    let data = new_op.data
    let {from, to} = new_move
    try {
        for (let i = 0; i<(path.length); i++){
            data = data[path[i]]
        }
        new_config = move(JSON.parse(JSON.stringify(data.config)), from, to)
    }
    catch (error){
        return false
    }
    data[move_name] = { move: new_move, config: new_config}
    return new_op
}

let getMoveName = ({from, to}, config) => { //TODO
    let piece = config.pieces[from]
    let captured = Boolean(config.pieces[to])

    if (!piece) return "invalid"
    
    if (piece.toUpperCase() == "P"){
        if (captured) return (from.slice(0,1)+"x"+to).toLowerCase()
        
        return to.toLowerCase()
    }
    
    else if (piece.toUpperCase() == "K" ){
        let castleFrom = ["E1", "E8"]
        let castleShortTo = [ "G1", "G8" ]
        let castleLongTo = [ "C1", "C8" ]

        if (castleFrom.includes(from)){
            if (castleShortTo.includes(to)) return "O-O"
            else if (castleLongTo.includes(to)) return "O-O-O"
        }
    }
  
    let move_name =  piece.toUpperCase()
    let otherSamePieces = Object.keys(config.pieces).filter((el)=>(config.pieces[el] == piece && el!=from))
    let specify = false
    otherSamePieces.forEach((el)=> {        
        if ((moves(config)[el])&&moves(config)[el].includes(to)){
            specify = true
            if (el.slice(0,1) != from.slice(0,1)){
                move_name+= (from.slice(0,1)).toLowerCase()
                return
            }
            else{
                move_name+=  from.slice(1)
                return
            }
        }
    })
    if (captured)
    move_name+="x"
    move_name+= to.toLowerCase()
    return move_name
    
}

let sortMoves = (moves) => (
    moves.sort( (a,b) => {
        let priority_a, priority_b
        switch(a.evalIcon){
            case "Best": priority_a = 4; break
            case "Good": priority_a = 3; break
            case "Inaccuracy": priority_a = 2; break
            case "Error": priority_a = 1; break
            default: priority_a = 0
        }
        switch(b.evalIcon){
            case "Best": priority_b = 4; break
            case "Good": priority_b = 3; break
            case "Inaccuracy": priority_b = 2; break
            case "Error": priority_b = 1; break
            default: priority_b = 0
        }
        if ((priority_b - priority_a) != 0) return (priority_b - priority_a)
        
        if (a.name.charCodeAt(0) != b.name.charCodeAt(0) ) return a.name.charCodeAt(0) - b.name.charCodeAt(0)
        
        return (a.name.charCodeAt(1) - b.name.charCodeAt(1))
   
    })
)

let getNotation = (path) => {
    let notation = []
    for (let i = 0; i< path.length; i++){
        if (i%2==0) notation.push({i: i/2+1, white: path[i], black: path[i+1]})
    }
    return notation
}

getOpeningData()
export { getOpeningData, addMoveToOpening, checkMove, getMoveName, sortMoves, getNotation }