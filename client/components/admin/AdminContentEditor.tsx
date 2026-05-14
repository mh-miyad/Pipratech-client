"use client";

import Image from "next/image";
import { Plus, Save, Trash2, Undo2 } from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";
import {
  type Control,
  type FieldValues,
  type UseFormSetValue,
  type UseFormWatch,
  type UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";

import type {
  AdminField,
  AdminPageConfig,
  AdminRepeatable,
} from "@/components/admin/admin-content-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormValues = FieldValues;
type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function fieldName(sectionId: string, name: string) {
  return `${sectionId}.${name}`;
}

function getDefaultValues(config: AdminPageConfig) {
  return config.sections.reduce<FormValues>((values, section) => {
    section.fields.forEach((field) => {
      values[fieldName(section.id, field.name)] =
        field.placeholder ?? field.options?.[0]?.value ?? "";
    });
    section.repeatables?.forEach((repeatable) => {
      values[fieldName(section.id, repeatable.name)] = [
        getDefaultRepeatableItem(repeatable),
      ];
    });
    return values;
  }, {});
}

function getDefaultRepeatableItem(repeatable: AdminRepeatable) {
  return repeatable.fields.reduce<Record<string, string>>((item, field) => {
    item[field.name] =
      repeatable.defaultItem?.[field.name] ??
      field.placeholder ??
      field.options?.[0]?.value ??
      "";
    return item;
  }, {});
}

function getInputType(field: AdminField) {
  return field.type === "url" ? "url" : "text";
}

function Toast({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  if (!toast) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border bg-white p-4 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={
              toast.type === "error"
                ? "text-sm font-semibold text-destructive"
                : "text-sm font-semibold text-brand-primary"
            }
          >
            {toast.type === "error" ? "Upload failed" : "Saved"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ImageUploadField({
  id,
  label,
  value,
  onChange,
  onToast,
}: {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  onToast: (toast: Exclude<ToastState, null>) => void;
}) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      onToast({ type: "error", message: "Only image files are allowed." });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      onToast({ type: "error", message: "Image must be smaller than 2MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        onToast({ type: "error", message: "Could not read this image file." });
        return;
      }

      onChange(reader.result);
      onToast({ type: "success", message: `${file.name} uploaded.` });
    };
    reader.onerror = () => {
      onToast({ type: "error", message: "Image upload failed. Try another file." });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-md border bg-white">
          {value ? (
            <Image
              src={value}
              alt={label}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="px-4 text-center text-sm text-muted-foreground">
              No image uploaded
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="lg" className="h-9" asChild>
            <label htmlFor={id} className="cursor-pointer">
              Upload Image
            </label>
          </Button>
          {value && (
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="h-9"
              onClick={() => onChange("")}
            >
              Remove
            </Button>
          )}
        </div>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Upload JPG, PNG, WebP, or SVG. Max size 2MB.
        </p>
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options = [],
  onChange,
}: {
  id: string;
  label: string;
  value?: string;
  options?: AdminField["options"];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div id={id} className="grid grid-cols-2 gap-2 rounded-lg border bg-muted/30 p-1">
        {options.map((option) => {
          const active = value === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              variant={active ? "default" : "ghost"}
              size="lg"
              className="h-9 rounded-md"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function RepeatableEditor({
  control,
  register,
  setValue,
  watch,
  repeatable,
  sectionId,
  onToast,
}: {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  repeatable: AdminRepeatable;
  sectionId: string;
  onToast: (toast: Exclude<ToastState, null>) => void;
}) {
  const name = fieldName(sectionId, repeatable.name);
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-3 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-brand-primary">
            {repeatable.label}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Add as many {repeatable.itemLabel.toLowerCase()} items as needed.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-9"
          onClick={() => append(getDefaultRepeatableItem(repeatable))}
        >
          <Plus className="size-4" />
          {repeatable.addLabel}
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((item, itemIndex) => (
          <div key={item.id} className="rounded-lg border bg-white p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-brand-primary">
                {repeatable.itemLabel} {itemIndex + 1}
              </p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(itemIndex)}
                disabled={fields.length === 1}
              >
                <Trash2 className="size-3" />
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {repeatable.fields.map((field) => {
                const inputName = `${name}.${itemIndex}.${field.name}`;
                const isTextarea = field.type === "textarea";

                return (
                  <div
                    key={inputName}
                    className={isTextarea ? "space-y-2 md:col-span-2" : "space-y-2"}
                  >
                    {field.type === "image" ? (
                      <ImageUploadField
                        id={inputName}
                        label={field.label}
                        value={watch(inputName)}
                        onChange={(value) =>
                          setValue(inputName, value, {
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }
                        onToast={onToast}
                      />
                    ) : field.type === "select" ? (
                      <SelectField
                        id={inputName}
                        label={field.label}
                        value={watch(inputName)}
                        options={field.options}
                        onChange={(value) =>
                          setValue(inputName, value, {
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                        }
                      />
                    ) : isTextarea ? (
                      <>
                        <Label htmlFor={inputName}>{field.label}</Label>
                      <Textarea
                        id={inputName}
                        rows={4}
                        placeholder={field.placeholder}
                        {...register(inputName)}
                      />
                      </>
                    ) : (
                      <>
                        <Label htmlFor={inputName}>{field.label}</Label>
                      <Input
                        id={inputName}
                        type={getInputType(field)}
                        placeholder={field.placeholder}
                        {...register(inputName)}
                      />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminContentEditor({ config }: { config: AdminPageConfig }) {
  const storageKey = `snl-admin-draft:${config.slug}`;
  const defaults = useMemo(() => getDefaultValues(config), [config]);
  const initialValues = useMemo(() => {
    if (typeof window === "undefined") {
      return defaults;
    }

    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      return defaults;
    }

    try {
      return { ...defaults, ...JSON.parse(saved) };
    } catch {
      return defaults;
    }
  }, [defaults, storageKey]);
  const [savedAt, setSavedAt] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const onSubmit = (values: FormValues) => {
    window.localStorage.setItem(storageKey, JSON.stringify(values));
    setSavedAt(new Date().toLocaleTimeString());
    setToast({ type: "success", message: "Draft saved in this browser." });
  };

  const resetDraft = () => {
    window.localStorage.removeItem(storageKey);
    reset(defaults);
    setSavedAt("");
    setToast({ type: "success", message: "Draft reset complete." });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl space-y-6">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="bg-brand-primary-light text-brand-primary">
            {config.sections.length} sections
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-primary">
            {config.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {config.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedAt && (
            <span className="text-xs font-medium text-brand-primary">
              Draft saved at {savedAt}
            </span>
          )}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-9"
            onClick={resetDraft}
          >
            <Undo2 className="size-4" />
            Reset Draft
          </Button>
          <Button type="submit" size="lg" className="h-9" disabled={!isDirty}>
            <Save className="size-4" />
            Save Draft
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-white">
          <CardTitle>Editable Sections</CardTitle>
          <CardDescription>
            These forms are ready for API connection later. For now they save to browser localStorage.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-5">
          <Accordion defaultValue={config.sections[0]?.id}>
            {config.sections.map((section, index) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger value={section.id}>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-primary text-xs text-white">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate">{section.title}</span>
                      <span className="mt-1 block truncate text-xs font-normal text-muted-foreground">
                        {section.description}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent value={section.id}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {section.fields.map((field) => {
                      const name = fieldName(section.id, field.name);
                      const isTextarea = field.type === "textarea";

                      return (
                        <div
                          key={name}
                          className={isTextarea ? "space-y-2 md:col-span-2" : "space-y-2"}
                        >
                          {field.type === "image" ? (
                            <ImageUploadField
                              id={name}
                              label={field.label}
                              value={watch(name)}
                              onChange={(value) =>
                                setValue(name, value, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                })
                              }
                              onToast={setToast}
                            />
                          ) : field.type === "select" ? (
                            <SelectField
                              id={name}
                              label={field.label}
                              value={watch(name)}
                              options={field.options}
                              onChange={(value) =>
                                setValue(name, value, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                })
                              }
                            />
                          ) : isTextarea ? (
                            <>
                              <Label htmlFor={name}>{field.label}</Label>
                            <Textarea
                              id={name}
                              rows={5}
                              placeholder={field.placeholder}
                              {...register(name)}
                            />
                            </>
                          ) : (
                            <>
                              <Label htmlFor={name}>{field.label}</Label>
                            <Input
                              id={name}
                              type={getInputType(field)}
                              placeholder={field.placeholder}
                              {...register(name)}
                            />
                            </>
                          )}
                        </div>
                      );
                    })}
                    {section.repeatables?.map((repeatable) => (
                      <RepeatableEditor
                        key={repeatable.name}
                        control={control}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                        repeatable={repeatable}
                        sectionId={section.id}
                        onToast={setToast}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </form>
  );
}
