{
  description = "A little leptos app to track your trash";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";

    devenv.url = "github:cachix/devenv";

    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-parts,
    devenv,
    fenix,
    crane,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      debug = true;
      systems = ["x86_64-linux" "aarch64-linux"];
      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        lib,
        ...
      }: let
        fenixToolchain = fenix.packages.${system}.fromToolchainFile {
          file = ./rust-toolchain.toml;
          sha256 = "sha256-gdYqng0y9iHYzYPAdkC/ka3DRny3La/S5G8ASj0Ayyc=";
        };

        craneLib =
          crane.lib.${system}.overrideToolchain fenixToolchain;

        workspace = let
          mkMember = {
            name,
            profile ? builtins.null,
          }: let
            CARGO_PROFILE =
              if builtins.isNull profile
              then "release"
              else "${profile}";
            cargoArtifacts = craneLib.buildDepsOnly {
              inherit CARGO_PROFILE;
              pname =
                if builtins.isNull profile
                then "pomolib-release"
                else "pomolib-${profile}";
              src = ./.;
            };
          in {
            inherit name cargoArtifacts CARGO_PROFILE;
            pname =
              if builtins.isNull profile
              then "${name}"
              else "${name}-${profile}";
          };
        in [
          (mkMember {name = "frontend";})
          (mkMember {
            name = "frontend";
            profile = "dev";
          })

          (mkMember {name = "logic";})
          (mkMember {
            name = "logic";
            profile = "dev";
          })
        ];
      in {
        devShells = let
          defaultConfig = {
            packages = with pkgs; [
              # MISC
              git

              # NIX
              alejandra
              nil
            ];
          };
        in {
          default = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [
              defaultConfig
              (import ./rust.nix {inherit pkgs fenixToolchain;})
              (import ./frontend.nix)
            ];
          };
          rust = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [
              defaultConfig
              (import ./rust.nix {inherit pkgs fenixToolchain;})
            ];
          };
          frontend = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [
              defaultConfig
              (import ./frontend.nix)
            ];
          };
        };

        packages = builtins.listToAttrs (
          map (
            {
              pname,
              name,
              cargoArtifacts,
              CARGO_PROFILE,
              ...
            }:
              lib.nameValuePair pname (craneLib.buildPackage {
                inherit pname cargoArtifacts CARGO_PROFILE;
                src = ./.;
                version = (builtins.fromTOML (builtins.readFile ./${name}/Cargo.toml)).package.version;
                cargoExtraArgs = "-p ${name} -p pomolib";
              })
          )
          workspace
        );

        apps = builtins.listToAttrs (
          map (
            {
              pname,
              name,
              ...
            }:
              lib.nameValuePair pname {
                type = "app";
                program = "${self.packages.${system}.${pname}}/bin/${name}";
              }
          )
          workspace
        );
      };
    };
}
