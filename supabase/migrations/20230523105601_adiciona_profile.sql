CREATE TABLE public.profiles (
    id uuid NOT NULL,
    full_name varchar(255),
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    has_avatar boolean DEFAULT false NOT NULL,

    CHECK (char_length(full_name) >= 3 AND char_length(full_name) <= 255),
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Somente o usuário pode atualizar seu perfil" ON public.profiles FOR UPDATE USING (true) WITH CHECK ((auth.uid() = id));
CREATE POLICY "Perfis são publicos para leitura" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Somente o usuário pode inserir seu perfil" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$begin
  insert into public.profiles (id, full_name, has_avatar, updated_at)
  values (new.id, new.raw_user_meta_data->>'full_name', false, now());
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();