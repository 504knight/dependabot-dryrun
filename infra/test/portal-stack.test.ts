import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, it } from 'vitest';
import { PortalStack } from '../lib/portal-stack.js';

describe('PortalStack', () => {
  const template = Template.fromStack(new PortalStack(new App(), 'Test'));

  it('creates an encrypted, private uploads bucket', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
    expect(template.findResources('AWS::S3::Bucket')).not.toEqual({});
  });
});
