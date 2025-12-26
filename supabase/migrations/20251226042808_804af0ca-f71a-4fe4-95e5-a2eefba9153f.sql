-- Create storage bucket for project files
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', true);

-- Allow anyone to view files (public bucket)
CREATE POLICY "Anyone can view project files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-files');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload project files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-files' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated users can update project files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'project-files' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete project files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-files' AND auth.role() = 'authenticated');