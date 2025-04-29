import { FC, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useDelegateStore } from '@/stores/delegate-store';
import { DelegateType } from '@/types/enum';
import { CircleHelpIcon } from 'lucide-react';
import { TooltipWithStopPropagation } from './TooltipWithStopPropogation';

const walletAddress = z
  .string()
  .min(1, 'Required')
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid address');

const baseSchema = {
  wallet: walletAddress,
  useShadow: z.boolean(),
};

const formSchemas: Record<DelegateType, z.ZodObject<any>> = {
  wallet: z.object({
    ...baseSchema,
  }),
  contract: z.object({
    ...baseSchema,
    contract: walletAddress,
  }),
  asset: z.object({
    ...baseSchema,
    contract: walletAddress,
    tokenId: z.string().min(1, 'Token ID is required'),
    mintEscrow: z.boolean().optional(),
  }),
};

type FormValues = z.infer<(typeof formSchemas)['wallet']> &
  Partial<z.infer<(typeof formSchemas)['contract']>> &
  Partial<z.infer<(typeof formSchemas)['asset']>>;

const DelegateForm: FC<{
  onFormUpdate?: (params: { isValid: boolean; values: FormValues }) => void;
}> = ({ onFormUpdate }) => {
  const { delegateType } = useDelegateStore();
  const schema = formSchemas[delegateType];
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      wallet: '',
      contract: '',
      tokenId: '',
      useShadow: false,
      useEscrow: false,
    },
    mode: 'onChange',
  });
  const { isValid } = form.formState;

  useEffect(() => {
    onFormUpdate?.({
      isValid: isValid,
      values: form.getValues(),
    });
  }, [form, isValid, onFormUpdate]);

  return (
    <>
      <div className="w-full text-3xl font-light uppercase mt-6 ">{delegateType}</div>
      <Form {...form}>
        <form className="space-y-5">
          {/* Wallet address */}
          <FormField
            control={form.control}
            name="wallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Delegate Wallet <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Example: Your hot wallet" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  The wallet you are delegating from. Must be a valid EVM-compatible address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contract address */}
          {(delegateType === DelegateType.CONTRACT || delegateType === DelegateType.ASSET) && (
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contract <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        delegateType === DelegateType.CONTRACT
                          ? 'Example: ERC20 token address'
                          : 'Address of NFT project or fungible token'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    The smart contract to delegate permissions to. For example, a DAO or
                    marketplace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Token ID */}
          {delegateType === DelegateType.ASSET && (
            <FormField
              control={form.control}
              name="tokenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Token ID <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="#" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    The specific token or NFT to delegate. Only this asset will be accessible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Use Shadow NFT */}
          <FormField
            control={form.control}
            name="useShadow"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Enable Shadow NFT</FormLabel>
                <TooltipWithStopPropagation content="Mirror key ownership rights to a Shadow NFT for tracking or visibility.">
                  <CircleHelpIcon className="w-4 h-4" />
                </TooltipWithStopPropagation>
              </FormItem>
            )}
          />

          {/* Escrow toggle (only for asset) */}
          {delegateType === DelegateType.ASSET && (
            <FormField
              control={form.control}
              name="useEscrow"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Mint delegate token using secure escrow</FormLabel>
                  <TooltipWithStopPropagation
                    content="Mint a special delegate token via escrow for added security and
                        revocability."
                  >
                    <CircleHelpIcon className="w-4 h-4" />
                  </TooltipWithStopPropagation>
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </>
  );
};

export default DelegateForm;
