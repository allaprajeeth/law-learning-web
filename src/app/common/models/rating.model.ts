export interface Ratings 
        {
            "id": number,
            "user": {
                "name": string,
                "email": string,
                "role": string, 
            },
            "rating": number,
            "comments": string,
            "editRating":boolean
           
        }