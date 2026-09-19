-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Project Table
-- One-to-many: one organization sponsors many service projects
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);

-- ========================================
-- Insert sample data: Service Projects
-- 5 projects per organization (organization_id 1 = BrightFuture Builders,
-- 2 = GreenHarvest Growers, 3 = UnityServe Volunteers)
-- ========================================
INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(1, 'Community Garden Build', 'Volunteers build raised garden beds that will supply a neighborhood food pantry.', 'Riverside Park', '2026-03-14'),
(1, 'Playground Renovation', 'Repair and repaint aging playground equipment at the community center.', 'Maple Street Community Center', '2026-04-11'),
(1, 'Wheelchair Ramp Build', 'Construct wheelchair ramps for elderly residents who need improved home access.', 'Oakwood Neighborhood', '2026-05-09'),
(1, 'Neighborhood Park Cleanup', 'Clear debris, mulch flower beds, and repaint benches throughout the park.', 'Sunset Park', '2026-06-06'),
(1, 'Senior Home Repair Day', 'Minor home repairs, including weatherproofing and railing fixes, for elderly homeowners.', 'Elmwood District', '2026-07-18'),
(2, 'Urban Farm Planting Day', 'Plant seasonal vegetables at the collective''s main urban farm plot.', 'Downtown Urban Farm', '2026-03-21'),
(2, 'Composting Workshop', 'Teach households how to start and maintain a backyard compost bin.', 'GreenHarvest Learning Center', '2026-04-25'),
(2, 'School Garden Program', 'Build and maintain a small vegetable garden at a local elementary school.', 'Lincoln Elementary School', '2026-05-16'),
(2, 'Farmers Market Volunteer Day', 'Help run the collective''s stand at the weekly neighborhood farmers market.', 'Central Farmers Market', '2026-06-13'),
(2, 'Seed Starting Class', 'Teach beginners how to start vegetable seeds indoors before the growing season.', 'GreenHarvest Learning Center', '2026-02-07'),
(3, 'Weekend Reading Buddies', 'Pair volunteers with elementary students for one-on-one reading practice.', 'Bright Path Library', '2026-03-08'),
(3, 'Neighborhood Food Drive', 'Collect and distribute groceries to families facing food insecurity.', 'UnityServe Distribution Center', '2026-04-04'),
(3, 'Free Clinic Day', 'Provide basic health screenings for uninsured residents.', 'Wellness Bridge Clinic', '2026-05-02'),
(3, 'Winter Coat Drive', 'Collect and distribute winter coats to families in need before cold weather arrives.', 'UnityServe Distribution Center', '2026-11-14'),
(3, 'Volunteer Training Night', 'Train new volunteers on service program logistics and safety guidelines.', 'UnityServe Office', '2026-08-20');

-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- ========================================
-- Project Category Table (junction table)
-- Many-to-many: a service project can belong to one or more categories,
-- and a category can be associated with one or more service projects.
-- Composite primary key prevents the same project/category pair twice.
-- ========================================
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_project (project_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

-- ========================================
-- Insert sample data: Project Category associations
-- category_id 1 = Environmental, 2 = Educational,
-- 3 = Community Service, 4 = Health and Wellness
-- ========================================
INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1), (1, 3),   -- Community Garden Build: Environmental, Community Service
(2, 3),           -- Playground Renovation: Community Service
(3, 3), (3, 4),   -- Wheelchair Ramp Build: Community Service, Health and Wellness
(4, 1), (4, 3),   -- Neighborhood Park Cleanup: Environmental, Community Service
(5, 3), (5, 4),   -- Senior Home Repair Day: Community Service, Health and Wellness
(6, 1),           -- Urban Farm Planting Day: Environmental
(7, 1), (7, 2),   -- Composting Workshop: Environmental, Educational
(8, 1), (8, 2),   -- School Garden Program: Environmental, Educational
(9, 3), (9, 4),   -- Farmers Market Volunteer Day: Community Service, Health and Wellness
(10, 1), (10, 2), -- Seed Starting Class: Environmental, Educational
(11, 2),          -- Weekend Reading Buddies: Educational
(12, 3),          -- Neighborhood Food Drive: Community Service
(13, 4),          -- Free Clinic Day: Health and Wellness
(14, 3),          -- Winter Coat Drive: Community Service
(15, 2), (15, 3); -- Volunteer Training Night: Educational, Community Service