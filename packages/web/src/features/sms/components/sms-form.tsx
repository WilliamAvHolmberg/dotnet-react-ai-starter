import { usePostApiSMSSend } from '@/api/hooks/api';
import type { PostApiSMSSendMutationError } from '@/api/hooks/api';
import { SendSMSRequestDTO } from '@/api/models';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/use-toast';
import { useState } from 'react';

export function SMSForm() {
  const { toast } = useToast();
  const { mutateAsync: sendSMS, isPending } = usePostApiSMSSend();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const request: SendSMSRequestDTO = {
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      message: formData.get('message') as string,
    };

    try {
      await sendSMS({ data: request });
      toast({
        title: 'SMS Sent Successfully',
        description: 'Your message has been sent',
      });
      setMessage('');
    } catch (error) {
      console.error('SMS error:', error);
      const apiError = error as PostApiSMSSendMutationError;
      toast({
        title: 'Failed to Send SMS',
        description: apiError.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send SMS</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              name="from"
              placeholder="Company name or phone number"
              required
              maxLength={11}
              pattern="^[a-zA-Z0-9]{1,11}|\+[1-9]\d{1,14}$"
              title="Enter either a company name (max 11 chars) or phone number in E.164 format"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              name="to"
              placeholder="+46700000000"
              required
              pattern="^\+[1-9]\d{1,14}$"
              title="Phone number must be in E.164 format (e.g. +46700000000)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              required
              maxLength={1600}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-32"
            />
            <p className="text-sm text-muted-foreground text-right">
              {message.length}/1600 characters
            </p>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Sending...' : 'Send SMS'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 