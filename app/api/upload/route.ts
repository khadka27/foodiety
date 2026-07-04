import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to clean filename and convert to title case for alt text
const cleanFilename = (name: string): string => {
  const withoutExt = name.substring(0, name.lastIndexOf(".")) || name;
  return withoutExt
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, filename, directory } = body;

    if (!file || !filename || !directory) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: file, filename, directory" },
        { status: 400 }
      );
    }

    // Validate directory name to prevent directory traversal
    const safeDirectory = directory.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!safeDirectory) {
      return NextResponse.json(
        { success: false, error: "Invalid directory name" },
        { status: 400 }
      );
    }

    // Extract base64 content
    const matches = file.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    let base64Data = file;
    
    if (matches && matches.length === 3) {
      base64Data = matches[2];
    } else if (file.includes(";base64,")) {
      base64Data = file.split(";base64,").pop();
    }

    const buffer = Buffer.from(base64Data, "base64");

    // Resolve directory path in public folder
    const targetDir = path.join(process.cwd(), "public", safeDirectory);

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique name: name_timestamp.ext
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const timestamp = Date.now();
    const uniqueFilename = `${baseName}_${timestamp}${ext}`;

    const filePath = path.join(targetDir, uniqueFilename);

    // Write file to filesystem
    await fs.promises.writeFile(filePath, buffer);

    // Return the relative public path and metadata
    const relativeUrl = `/${safeDirectory}/${uniqueFilename}`;
    const cleanTitle = cleanFilename(filename);

    return NextResponse.json({
      success: true,
      data: {
        url: relativeUrl,
        title: cleanTitle,
        alt: cleanTitle,
      },
    });
  } catch (err: any) {
    console.error("Error in upload API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
