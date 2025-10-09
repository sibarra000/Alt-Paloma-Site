import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Health check
app.get('/make-server-8b6f073b/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission endpoint
app.post('/make-server-8b6f073b/contact', async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'description', 'monthlySpend', 'currentProviders'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return c.json({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }, 400);
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, 400);
    }

    // Store submission in KV store
    const submissionId = crypto.randomUUID();
    const submission = {
      id: submissionId,
      name: body.name,
      email: body.email,
      company: body.company,
      description: body.description,
      monthlySpend: body.monthlySpend,
      currentProviders: body.currentProviders,
      phone: body.phone || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`contact_submission_${submissionId}`, submission);

    console.log(`Contact form submission received: ${submissionId} from ${body.email}`);

    return c.json({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId 
    });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process form submission. Please try again.' 
    }, 500);
  }
});

// Get all contact submissions (for admin purposes)
app.get('/make-server-8b6f073b/contact/submissions', async (c) => {
  try {
    const submissions = await kv.getByPrefix('contact_submission_');
    return c.json({ 
      success: true, 
      submissions: submissions.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch submissions' 
    }, 500);
  }
});

Deno.serve(app.fetch);
