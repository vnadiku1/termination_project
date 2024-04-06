const collection = require( '../utilites/connection' );
const userData = require( './user.json' );

let user = {}

user.setupDB = () => {
    return collection.getUserCollection().then( usercol => {
        return usercol.deleteMany().then( data => {
            if( data ){ //
            return usercol.insertMany( userData ).then( result => {
                if( result && result.length > 0 ) return result.length
                else return null
            } );
        } else{return null}//
        } );
    } );
}

user.userLogin = ( username, password ) => {
    return collection.getUserCollection().then( usercol => {
        console.log(usercol.length, username,password)
        return usercol.findOne( { "userdetails.userName": username } ).then( data => {
            if( data ) {
                if( password == data['userdetails']['password'] ) {
                    return data
                    
                } else{
                    throw new Error( "The password entered is incorrect!!" )
                }
            } else{
                throw new Error( "You are not registered !" );
            }
        } )
    } )}
    user.pushOrders = ( userName,orderobj )=>{
        // console.log(orderobj); 
        return collection.getUserCollection().then( usercol =>{
            return usercol.findOne( {"userdetails.userName": userName} ).then( user =>{
                return usercol.updateOne( { "userdetails.userName": userName },
                                    {$push: {order: orderobj} } ).then( updatedData => {
                                        if( updatedData.nModified == 1 ) {
                                            return user['order']
                                        } else{
                                            throw new Error( "Unable to add product" )
                                        }
                                    } )
            } )
        } )
    }
    
    user.getOrders = ( username )=>{
        return collection.getUserCollection().then( usercol =>{
            return usercol.findOne( {"userdetails.userName": username},{_id: 0,order: 1} ).then( orders =>{
                if( orders ){
                    return orders.order
                }
                else{
                    let err=new Error( "Error in getting orders" )
                    err.status=404
                    throw err
                }
            } )
        } )
    }
    


module.exports = user