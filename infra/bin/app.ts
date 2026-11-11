import { App } from 'aws-cdk-lib';
import { PortalStack } from '../lib/portal-stack.js';

const app = new App();

// Synth-only: this repo exists to demonstrate Dependabot and is never deployed.
new PortalStack(app, 'DependabotDemoPortal');
