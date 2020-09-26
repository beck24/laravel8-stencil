<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeployFrontend extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:frontend';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Build/Deploy the front end';

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
     * @return int
     */
    public function handle()
    {
        $this->info('Unlinking public storage during front end build');

        // first unlink the storage so it doesn't get wiped out by the front end build
        $fs = $this->laravel->make('files');
        if ($fs->exists(public_path('storage'))) {
            $fs->delete(public_path('storage'));
        }

        // ensure it's actually been unlinked, do not continue
        // if there was a failure above
        if ($fs->exists(public_path('storage'))) {
            $this->error('Could not unlink storage, please unlink manually and try again');
            return;
        }

        $this->info('Building Front End... (may take some time)');
        
        $output = [];
        exec('cd ../stencil && npm run prod', $output);

        foreach ($output as $o) {
            $this->info($o);
        }

        $this->info('Re-linking public storage');

        $this->call('storage:link');

        $this->call('cache:clear');
    }
}