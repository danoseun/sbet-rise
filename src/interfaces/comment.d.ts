export interface Comment {
    id?: number;
    user_id: string;
    post_id: string;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}