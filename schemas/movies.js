const z = require('zod') // Con "zod" podremos hacer validaciones en el backend acerca de los datos enviados por el usuario en el POST.

// Creamos un "SCHEMA" para las movies, además de poner algunor requerimientos y mensajes de error.
const movieSchema = z.object({
  title: z.string({ // Debe ser un string.
    invalid_type_error: 'Movie title must be a string.',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024), // Debe ser un número - entero - entre 1900 a 2024.
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({ // Debe ser string - URL
    message: 'Poster must be a valid URL.'
  }),
  genre: z.array( // Debe ser un array - enumeramos los tipos de generos que podrian ser.
    z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']), {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre.'
    }
  )
})

// Con esta función "VALIDAMOS" el objeto, si coincide con todo los requerimientos de "movieSchema".
function validateMovie (input) {
  return movieSchema.safeParse(input) // Mientras que el "parse" solo devuelve un objeto del tipo "result", el "safeParse", devuelve un objeto "result" y un "error", si es que ocurrio alguno.
}

// Con esta función "VALIDAMOS" parcialmente el recurso ingresado. Solo validara las propiedades que este.
function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input) // El "partial()", sirve para convertir todas las propiedades en "opcionales". Sino estan, sigue de largo, pero si existe al menos una, realizara las validaciones necesarias.
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
