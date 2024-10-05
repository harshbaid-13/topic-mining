import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Comment from "../../../../models/comment";
import axios from "axios";

export async function GET(request) {
  try {
    await connectToDatabase();
    const comments = await Comment.find({});
    if (!comments) {
      return NextResponse.json({ success: false, message: "No new comments" });
    }
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { comment } = await request.json();
    // Define the URL for your Python Flask API
    const url = "https://flask-model-srbs.onrender.com/predict";

    // Prepare the data for the POST request
    const data = {
      input_string: [comment],
    };
    let response;
    try {
      // Make the POST request to the Flask API
      response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Send the response from the Flask API back to the client
      // res.status(200).json(response.data);
    } catch (error) {
      // Handle errors and send the error response
      console.error("Error:", error);
      // res.status(500).json({ message: "Error making request to Python API" });
    }
    console.log(response.data);
    const newComment = await Comment.create({
      comment,
    });
    return NextResponse.json({
      success: true,
      message: "Comment added Successfully",
      data: response.data.prediction,
    });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({
      success: false,
      message: "Comment couldn't added successfully",
    });
  }
}
