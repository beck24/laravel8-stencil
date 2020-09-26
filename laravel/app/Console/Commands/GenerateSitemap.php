<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $paths = [
            '/' => [
                'priority' => 0.8,
                'change' => 'daily', // hourly, daily, weekly, monthly, yearly
            ],
        ];

        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';

        foreach ($paths as $path => $params) {
            $sitemap .= '<url>';
            $sitemap .= '<loc>' . url($path) . '</loc>';

            if (isset($params['lastmod']) && $params['lastmod']) {
                $sitemap .= '<lastmod>' . $params['lastmod'] . '</lastmod>';
            }
            else {
                $sitemap .= '<lastmod>' . now()->format('c') . '</lastmod>';
            }

            if (isset($params['change']) && $params['change']) {
                $sitemap .= '<changefreq>' . $params['change'] . '</changefreq>';
            }

            if (isset($params['priority']) && $params['priority']) {
                $sitemap .= '<priority>' . $params['priority'] . '</priority>';
            }

            $sitemap .= '</url>';
        }

        $sitemap .= '</urlset>';

        file_put_contents(public_path('sitemap.xml'), $sitemap);
        file_put_contents(base_path('public-laravel/sitemap.xml'), $sitemap);
    }
}