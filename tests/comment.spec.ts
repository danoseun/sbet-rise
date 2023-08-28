import request from 'supertest';
import app from '../src/app';
import HttpStatus from 'http-status-codes';
import { Response } from 'superagent';


let user: Response;

export const commentTests = () => {
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
    
    describe('Comment Specs', () => {    
    
        it('should not create comment for unauthenticated user', async() => {
            const response = await request(app)
            .post(`/v1/posts/1/comments`)
            .send({
                "content": "Comment will not be created because user is not authenticated"
            })
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('No token provided');
            
        })
    
        it('should not create a comment for authenticated user with empty content', async() => {
            const postObj = {
                "content": "         "
            }
    
            const response = await request(app)
            .post(`/v1/posts/1/comments`)
            .send(postObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
        
            expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
            expect(response.body.status).toEqual('error');
            expect(response.body.data).toEqual({content: { message: 'content is not allowed to be empty' } });
        })
        
        it('should not create a comment for authenticated user if post is not found', async() => {
            const commentObj = {
                "content": "This comment should be created because post is not found"
            }
    
            const response = await request(app)
            .post(`/v1/posts/500/comments`)
            .send(commentObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
            expect(response.body.status).toEqual('error');
        })

        it('should create a comment for authenticated user', async() => {
            const commentObj = {
                "content": "This comment should be created"
            }
    
            const response = await request(app)
            .post(`/v1/posts/1/comments`)
            .send(commentObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.CREATED);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.content).toEqual(commentObj.content);
        })

        it('should create another post for authenticated user', async() => {
            const commentObj = {
                "content": "This other comment should be created"
            }
    
            const response = await request(app)
            .post(`/v1/posts/1/comments`)
            .send(commentObj)
            .set('Authorization', `Bearer ${user.body.data.accessToken}`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.CREATED);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.content).toEqual(commentObj.content);
        })
    
        it('should fetch all comments for posts', async() => {
            const response = await request(app)
            .get(`/v1/posts/1/comments`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.OK);
            expect(response.body.status).toEqual('success');
        })

        it('should throw an error when trying to fetch comments for non-existent post', async() => {
            const response = await request(app)
            .get(`/v1/posts/500/comments`)
            .set('Accept', 'application/json')
            
            expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
            expect(response.body.status).toEqual('error');
            expect(response.body.message).toEqual('fetching comments for non-existent post');
        })
    })
}
