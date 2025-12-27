-- Remove existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON public.projects;

-- Create new PERMISSIVE policies (default behavior)
CREATE POLICY "Public read access for projects"
ON public.projects
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);