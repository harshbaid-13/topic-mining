"use client"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function CommentForm() {
    const [comment, setComment] = useState("Loved the service.")
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/comments`,
                {
                    comment: comment,
                }
            );
            if (data.success) {
                setComment("");
                toast({
                    description: data.data,
                })
            } else {
                alert(data?.message);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="mt-10 grid w-full gap-2">
            <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Please enter your comment" />
            {loading ? <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button> :
                <Button onClick={handleSubmit} >Submit Comment</Button>}

        </div>
    )
}
