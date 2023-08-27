import request from 'supertest';
import app from '../src/app';
import HttpStatus from 'http-status-codes';
import { Response } from 'superagent';


let user: Response;

export const postTests = () => {
    beforeAll(async () => {
        //log user in
        user = await request(app)
        .post(`/v1/login`)
        .send({
            "email": 'goodformatemail@gmail.com',
            "password": 'Password54@'
        })
        .set('Accept', 'application/json')
    });
    
    describe('Post Specs', () => {    
    
        it('should not create post for unauthenticated user', async() => {
            const response = await request(app)
            .post(`/v1/posts`)
            .send({
                "content": "Post will not be created because user is not authenticated"
            })
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('No token provided');
            
        })
    
        it('should not create a post for authenticated user with empty content', async() => {
            const postObj = {
                "content": "         "
            }
    
            const response = await request(app)
            .post(`/v1/posts`)
            .send(postObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
        
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.data).toEqual({content: { message: 'content is not allowed to be empty' } });
        })
    
        it('should create a post for authenticated user', async() => {
            const postObj = {
                "content": "This post should be created"
            }
    
            const response = await request(app)
            .post(`/v1/posts`)
            .send(postObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.CREATED);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.content).toEqual(postObj.content);
        })
    
        it('should fetch all posts for authenticated user', async() => {
            const response = await request(app)
            .get(`/v1/users/${user.body.data.id}/posts`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.OK);
            expect(response.body.status).toEqual('success');
        })

        it('should throw an error when trying to fetch posts for non-existent user', async() => {
            const response = await request(app)
            .get(`/v1/users/500/posts`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('fetching posts for non-existent user');
        })
    })
}
