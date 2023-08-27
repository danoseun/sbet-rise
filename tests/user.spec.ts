import request from 'supertest';
import app from '../src/app';
import HttpStatus from 'http-status-codes';

export const userTests = () => {
    describe('User Specs', () => {
        it('should not create a user with invalid email and valid password format', async() => {
            const response = await request(app)
            .post(`/v1/users`)
            .send({
                "email": "wrongformatemail.com",
                "name": "No name",
                "password": "Password54@"
            })
            .set('Accept', 'application/json')
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('Validation Error');
            expect(response.body.data).toEqual({email: { message: 'email should be a valid email' } })
        })
    
        it('should not create a user with valid email and invalid password format', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "name": "Faker name",
                "password": "password54@"
            }
            const response = await request(app)
            .post(`/v1/users`)
            .send(userObj)
            .set('Accept', 'application/json')
    
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('Validation Error');
            expect(response.body.data).toEqual({password: { message: `password with value ${userObj.password} fails to match the upper-case pattern` } })
        })
        
        it('should not create a user with empty email and valid password format', async() => {
            const response = await request(app)
            .post(`/v1/users`)
            .send({
                "email": "           ",
                "name": "user name",
                "password": "Password54@"
            })
            .set('Accept', 'application/json')
        
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('Validation Error');
            expect(response.body.data).toEqual({email: { message: 'email is not allowed to be empty' } })
        })
    
        it('should not create a user with valid email and empty password input', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "name": "new name",
                "password": "          "
            }
            const response = await request(app)
            .post(`/v1/users`)
            .send(userObj)
            .set('Accept', 'application/json')
    
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('Validation Error');
            expect(response.body.data).toEqual({password: { message: 'password is not allowed to be empty' } })
        })

        it('should not create a user with valid email, valid password input but no name', async() => {
            const userObj = {
                "email": "goodemail@gmail.com",
                "name": "    ",
                "password": "MatchedPass54@"
            }
            const response = await request(app)
            .post(`/v1/users`)
            .send(userObj)
            .set('Accept', 'application/json')
    
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('Validation Error');
            expect(response.body.data).toEqual({name: { message: 'name is not allowed to be empty' } })
        })
    
        it('should create a user with valid email and valid password format', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "name": "Created User",
                "password": "Password54@"
            }
            const response = await request(app)
            .post(`/v1/users`)
            .send(userObj)
            .set('Accept', 'application/json')
           
            expect(response.statusCode).toEqual(HttpStatus.CREATED);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.email).toEqual(userObj.email);
        })
    
        it('should not create a user with valid email and valid password format after previously creating it', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "name": "not created name",
                "password": "Password54@"
            }
            const response = await request(app)
            .post(`/v1/users`)
            .send(userObj)
            .set('Accept', 'application/json')
    
            expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
            expect(response.body.status).toEqual('error');
        })
    
        it('should login existing user with valid email and valid password format and create access token', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "password": "Password54@"
            }
            const response = await request(app)
            .post(`/v1/login`)
            .send(userObj)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.OK);
            expect(response.body.status).toEqual('success');
        })
    
        it('should not login existing user with valid email and invalid password format', async() => {
            const userObj = {
                "email": "goodformatemail@gmail.com",
                "password": "        "
            }
            const response = await request(app)
            .post(`/v1/login`)
            .send(userObj)
            .set('Accept', 'application/json')
    
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
        })
    })
}

