import cors from 'cors'

const ACCEPTED_ORIGIN = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'

  ]
  

  export  const corsCafeteria = () => cors({
    origin:(origin, callback) => {
  
      if(ACCEPTED_ORIGIN.includes(origin) || !origin){
        return callback(null, true)
      }

      if(!origin) {
        return callback(null, true)
      }
      return callback(new Error('no esta permitido por cors'))
    }
  })

